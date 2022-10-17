import { v4 as uuid } from 'uuid'

const formatBlocks = (blocksJSON) => {
  const blocksToFormat = JSON.parse(blocksJSON)

  const deleteKeys = [
    'attributeType',
    'blockType',
    'dynamicContent',
    'originalContent',
    'saveContent',
    'postID',
    'get_parent',
    'order'
  ]

  const removeUnsuedKeys = (blocks) => {
    blocks.forEach(block => {
      assignBlockID(block)
      deleteKeys.forEach(key => {
        delete block[key]
      })
      if (block.innerBlocks?.length) {
        removeUnsuedKeys(block.innerBlocks)
      } else {
        delete block.innerBlocks
      }
    })
  }

  const assignBlockID = (block) => {
    block.id = uuid()
  }

  removeUnsuedKeys(blocksToFormat)

  return blocksToFormat
}

export default formatBlocks