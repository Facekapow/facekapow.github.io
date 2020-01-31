const SUBPART_REGEX = /^(#|\.)?[A-Za-z0-9\-]+$/;

module.exports = ({ markdownAST }, options) => {
  function visitNode(node) {
    if (node.type === 'blockquote') {
      if (node.children && node.children.length > 0 && node.children[0].type === 'paragraph') {
        const paragraph = node.children[0]
        if (paragraph.children && paragraph.children.length > 0 && paragraph.children[0].type === 'text') {
          const text = paragraph.children[0].value
          const indexOfFirstNewline = text.indexOf('\n')
          let firstLine = text.substr(0, indexOfFirstNewline === -1 ? text.length : indexOfFirstNewline).trim()
          if (firstLine[0] === '{' && firstLine[firstLine.length - 1] === '}') {
            firstLine = firstLine.substr(1, firstLine.length - 2)
            if (!node.data) {
              node.data = {}
            }
            if (!node.data.hProperties) {
              node.data.hProperties = {}
            }
            // handle stuff like "#id .class1 .class2"
            const parts = firstLine.split(' ')
            for (const part of parts) {
              if (part.length === 0) {
                continue
              }
              // handle stuff like "#id.class1.class2"=
              const subparts = part.split('.')
              for (const subpart of subparts) {
                if (subpart.length === 0) {
                  continue
                }
                if (!SUBPART_REGEX.test(subpart)) {
                  continue
                }
                if (subpart[0] === '#') {
                  node.data.hProperties.id = subpart.substr(1)
                } else {
                  if (!node.data.hProperties.className) {
                    node.data.hProperties.className = []
                  }
                  node.data.hProperties.className.push(subpart)
                }
              }
            }
            paragraph.children[0].value = indexOfFirstNewline === -1 ? '' : paragraph.children[0].value.substr(indexOfFirstNewline + 1)
            if (paragraph.children[0].value.trim().length === 0) {
              paragraph.children.splice(0, 1)
              if (paragraph.children.length === 0) {
                node.children.splice(0, 1)
              }
            }
          }
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
