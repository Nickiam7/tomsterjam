import { gql } from '@apollo/client'
import client from 'client'
import { BlockRenderer, Cover } from 'components'
import formatBlocks from '../utilities/formatBlocks'

const Home = (props) => {
  console.log('prosp: ', props)
  return (
    <div>
      <BlockRenderer blocks={props.blocks} />
    </div>
  )
}

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query homeQuery {
        nodeByUri(uri: "/") {
          ... on Page {
            id
            title
            blocksJSON
          }
        }
      }
    `
  })
  const blocks = formatBlocks(data.nodeByUri.blocksJSON)
  return {
    props: {
      blocks: blocks
    }
  }
}

export default Home