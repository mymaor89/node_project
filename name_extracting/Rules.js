module.exports = {
    isVariableDeclaraction: function (node) {
        return node.type == 'VariableDeclaration';
    },
    isFunctionDeclaraction: function (node) {
        return node.type == 'FunctionDeclaration';
    },
    isFunctionDeclaractio: function (node) {
        return node.type == 'FunctionDeclaration';
    },
    isFunctionExpression: function (node) {
        return node.type == 'FunctionExpression';
    },
    isArrrowFunctionExpression: function (node) {
        return node.type == 'ArrowFunctionExpression';
    },
    isClassDeclaration: function (node) {
        return node.type == 'ClassDeclaration';
    },
    isProperty: function (node) {
        return node.type == 'Property';
    },
    isArrayDecleration: function (variableDecleration) {
        return variableDecleration.init.type == 'ArrayExpression';
    },
    isObjectLiteral: function (variableDecleration) {
        return variableDecleration.init.type == 'ObjectExpression';
    }
    ,
    isMethod: function (node) {
       return module.exports.isProperty(node) && (module.exports.isFunctionExpression(node.value) ||
       module.exports.isArrowFunctionExpression(node.value));
    }

}