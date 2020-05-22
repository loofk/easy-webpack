const path = require('path')
const fs = require('fs')
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

module.exports = {
  // 获取文件并转化成抽象语法树
  getAst: path => {
    const code = fs.readFileSync(path, 'utf-8')
    return parse(code, { sourceType: 'module' })
  },

  // 获取文件的依赖
  getDependecies: (ast, filename) => {
    const dependecies = {}

    traverse(ast, {
      // 找到import语句
      ImportDeclaration ({ node }) {
        const dirname = path.dirname(filename)
        // 完整的import路径
        const filePath = './' + path.join(dirname, node.source.value)
        dependecies[node.source.value] = filePath
      }
    })

    return dependecies
  },

  // 将ast转化为code
  getCode: ast => {
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })

    return code
  }
}