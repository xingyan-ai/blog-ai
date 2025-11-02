import { getGlobalData, getPost } from '@/lib/db/getSiteData'
import { getPostBlocks } from '@/lib/db/getSiteData'

export default function DebugPrompt({ data, post, blockMap }) {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', fontSize: '12px' }}>
      <h1>Debug Prompt 页面数据</h1>
      
      <h2>Post 基本信息:</h2>
      <pre>{JSON.stringify(post, null, 2)}</pre>
      
      <h2>BlockMap 结构:</h2>
      <pre>{JSON.stringify(blockMap ? Object.keys(blockMap) : 'null', null, 2)}</pre>
      
      {blockMap?.block && (
        <>
          <h2>Block 数量: {Object.keys(blockMap.block).length}</h2>
          <h2>Collection 数据:</h2>
          <pre>{JSON.stringify(blockMap.collection || 'null', null, 2)}</pre>
          <h2>Collection Query:</h2>
          <pre>{JSON.stringify(blockMap.collection_query || 'null', null, 2)}</pre>
          <h2>Collection View:</h2>
          <pre>{JSON.stringify(blockMap.collection_view || 'null', null, 2)}</pre>
        </>
      )}
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const props = await getGlobalData({ from: 'debug-prompt' })
    
    // 查找 prompt 页面
    const post = props.allPages?.find(p => p.slug === 'prompt' || p.slug === '/prompt')
    
    if (!post) {
      return {
        props: {
          data: null,
          post: null,
          blockMap: null,
          error: 'Post not found in allPages'
        }
      }
    }
    
    // 获取完整的 blockMap
    const blockMap = await getPostBlocks(post.id, 'debug-prompt')
    
    return {
      props: {
        data: props.allPages?.length || 0,
        post: JSON.parse(JSON.stringify(post)),
        blockMap: blockMap ? {
          blockCount: Object.keys(blockMap.block || {}).length,
          hasCollection: !!blockMap.collection,
          hasCollectionQuery: !!blockMap.collection_query,
          hasCollectionView: !!blockMap.collection_view,
          collectionIds: blockMap.collection ? Object.keys(blockMap.collection) : [],
          collectionViewIds: blockMap.collection_view ? Object.keys(blockMap.collection_view) : []
        } : null
      }
    }
  } catch (error) {
    return {
      props: {
        data: null,
        post: null,
        blockMap: null,
        error: error.message
      }
    }
  }
}
