import { NotionAPI } from 'notion-client'
import { getPageTitle, normalizeTitle, getBlockIcon, getPageProperty, getAllPagesInSpace, getBlockParentPage } from 'notion-utils'
import { Block, BlockMap, ImageBlock, NotionMap, RecordMap } from 'notion-types'

const notion = new NotionAPI()

const getPageIconUrl = (block) => {
  const s3Icon = block.format['page_icon']
  const encoded = `https://notion.so/image/${encodeURIComponent(s3Icon)}`
  const imageUrl = new URL(encoded)
  imageUrl.searchParams.set('table', 'block')
  imageUrl.searchParams.set('id', block.id)
  imageUrl.searchParams.set('cache', 'v2')
  return imageUrl.toString()
}
const getFirstImageUrl = (block: BlockMap) => {
  try {

    for (const blockEntries of Object.entries(block)) {
      const [ key, { value }] = blockEntries
    /* tried to filter only values that meet ImageBlock Type, but couldn't figure it out */
      
      const displaySource = value?.format?.['display_source']
      if (displaySource) { 
        const encoded = `https://notion.so/image/${encodeURIComponent(displaySource)}`
        const imageUrl = new URL(encoded)
        imageUrl.searchParams.set('table', 'block')
        imageUrl.searchParams.set('id', value.id)
        imageUrl.searchParams.set('cache', 'v2')
        return imageUrl.toString()
       }

    }

  } catch (err) {
    console.log('getFirstImage', err)
  }
  
}


export async function getNotionPage(topicProp) {
  try {

    const recordMap = await notion.getPage(topicProp)
    let parentId, parentIcon
    for (const [blockKey, blockData] of Object.entries(recordMap.block)) {
      if (blockData.value.parent_table === "space") {
        parentId = blockData.value.id
        parentIcon = getPageIconUrl(blockData.value)
      }
    }
    const title = getPageTitle(recordMap) || null
    const titleUrl = normalizeTitle(title)

    return { 
      topicId: topicProp as string,
      titleUrl: titleUrl || null, 
      title: title || null, 
      recordMap: recordMap,
      userIcon: parentIcon
    }
  } catch (err) {
    console.log(err)
    return {
      topicId: null,
      titleUrl: null, 
      title: null, 
      recordMap: null,
      userIcon: null
    }
  }
}

export const getNotionPages = async ( notionId: string ): Promise<{
  title: string
  titleUrl: string
  recordMap: Block
  userIcon: string
  firstImage: string
  topicIcon: string
}[]> => {
  try {
    const recordMap = await notion.getPage(notionId)

    let parentId = null
    let parentIcon = null
    for (const [blockKey, blockData] of Object.entries(recordMap.block)) {
      if (blockData.value.parent_table === "space") {
        parentId = blockData.value.id
        parentIcon = getPageIconUrl(blockData.value)
      }
    }

    const notionTopics = []
    const allPages = await getAllPagesInSpace(notionId, null, notion.getPage.bind(notion))
    for (const [pageKey, pageValue] of Object.entries(allPages)) {
      const title = getPageTitle(pageValue)
      const titleUrl = normalizeTitle(title)
      const firstImage = getFirstImageUrl(pageValue.block) || null
      console.log("firstImage", firstImage)

      title && (pageKey !== parentId) && notionTopics.push({
        // topicId: page,
        title: title,
        titleUrl: titleUrl,
        recordMap: pageValue,
        userIcon: parentIcon,
        firstImage: firstImage,
        topicIcon: null
      })
    }
    return notionTopics
  } catch (err) {
    console.log("notion not found")
    return []
  }
}

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
export type TopicObjs = {
  username: string
  title: string
  titleUrl: string
  recordMap: Block
}



export const getBrowseTopics = async ( notionId: string, username: string ): Promise<Expand<TopicObjs>[]> => {
  try {
    const recordMap = await notion.getPage(notionId)
    let parentBlockKey = null
    for (const [blockKey, blockData] of Object.entries(recordMap.block)) {
      if (blockData.value.parent_table === "space") {
        parentBlockKey = blockKey
      }
    }


    const notionTopics = []
    const allPages = await getAllPagesInSpace(notionId, null, notion.getPage.bind(notion))

    /* i think allPages is null in prod */

    for (const [pageKey, pageValue] of Object.entries(allPages)) {
      for (const [key, value] of Object.entries(pageValue.block)) {
        if (key === pageKey) {
          const block = value.value
        
          const pageProperty = getPageProperty('Property', block, recordMap)
  
          if (pageProperty === 'blog' || block.parent_table === "space") {
            const workingUrl = getPageIconUrl(block)
            const title = getPageTitle(pageValue)
            const titleUrl = normalizeTitle(title)
            const topicObj = {
              username: username,
              title: title,
              titleUrl: block.parent_table === "space" ? "" : titleUrl,
              recordMap: pageValue,
              userIcon: workingUrl?? null
            }
      
            title && notionTopics.push(topicObj)
        }

        } 
      }

    // }
  }

    return notionTopics
  } catch (err) {
    console.log("getBrowseTopics notionErr")
    return null
  }
}