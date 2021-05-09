class PrettyPrinterVisitor extends Visitor{
    visitTree(tree){
        this.result = "";
        let list = [];
        list.push(tree);
        this.print(list, 0, 0);
    }
    add(list, tree){
        if(tree != null) list.push(tree);
    }
    
    print(list, prevLevel, prevSpace){
        if(list.length == 0) return;
        let tree = list.shift();
        let n = tree.spaces;
        if(prevLevel == tree.level)
            n -= prevSpace;
        else
            this.result += "\n";
        while (n -- > 0 ) this.result += "-";
        this.result += tree.data;
        this.add(list, tree.left);
        this.add(list, tree.right);
        this.print(list, tree.level, tree.totalSpaces);
    }
}
class PrettyTreeCreatorVisitor extends Visitor{
    constructor(){
        super(0);
        this.space = 0;
    }
    visitTree(tree){
        this.prettyTree=this.createTree(tree, 0);
    }
    createTree(tree, level){
        if (tree == null) return null;
        let newTree = new Tree(tree.data);
        newTree.left = this.createTree(tree.left, level + 1);
        newTree.dataSize = newTree.data.toString().length;
        newTree.spaces = this.space;
        newTree.level = level;
        newTree.totalSpaces = newTree.spaces + newTree.dataSize;
        this.space += newTree.dataSize;
        newTree.right = this.createTree(tree.right, level + 1);
        return newTree;
    }
}
class TreeGroupByVisitor extends Visitor{
    constructor(f){
        super(f);
        this.groups = {};
    }
    visitTree(tree){
        if(tree == null) return;
        (this.groups[tree[this.f]] = (this.groups[tree[this.f]] || [])).push(tree);
        this.visitTree(tree.left);
        this.visitTree(tree.right);
    }
}