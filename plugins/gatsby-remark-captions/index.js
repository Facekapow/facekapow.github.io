module.exports = ({ markdownAST }, options) => {
  function visitNode(node) {
    if (node.type === 'paragraph') {
      if (node.children && node.children.length > 1) {
        const firstChild = node.children[0]
        const lastChild = node.children[node.children.length - 1]
        const secondToLastChild = node.children[node.children.length - 2]

        if (
          firstChild.type === 'text' &&
          firstChild.value.length > 0 &&
          firstChild.value[0] === '{' &&
          secondToLastChild.type === 'text' &&
          secondToLastChild.value.length > 0 &&
          secondToLastChild.value[secondToLastChild.value.length - 1] === '}' &&
          (
            lastChild.type === 'image' ||
            (
              // handle gatsby-remark-images nodes
              lastChild.type === 'html' &&
              lastChild.url
            )
          )
        ) {
          const firstText = firstChild.value.substr(1)
          const secondToLastText = secondToLastChild.value.substr(0, secondToLastChild.value.length - 1)
          let text = firstText
          if (node.children[0] === node.children[node.children.length - 2]) {
            text = text.substr(0, text.length - 1)
          } else {
            text += secondToLastText
          }
          let restChildren = []
          if (node.children.length > 3) {
            restChildren = node.children.slice(1, node.children.length - 2)
          }
          node.type = 'figure'
          node.data = {
            hName: 'figure',
          }
          node.children = [
            node.children[node.children.length - 1],
            {
              type: 'figcaption',
              data: {
                hName: 'figcaption',
              },
              children: [
                {
                  type: 'text',
                  value: text,
                },
                ...restChildren,
              ],
            },
          ]
        }
      }
    }

    if (node.children) {
      for (const child of node.children) {
        visitNode(child)
      }
    }
  }
  visitNode(markdownAST)
  return markdownAST
}
