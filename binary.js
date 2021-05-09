class InsertVisitor extends Visitor{
    visitTree(tree){
        let newValue = this.f;
        if(tree == null) return (this.newTree = new BinaryTree(newValue)) ;
        if(tree.data > newValue)
            tree.left = this.visitTree(tree.left);
        else
            tree.right = this.visitTree(tree.right);
        return tree;
    }
}
class ContainsVisitor extends Visitor{
    visitTree(tree){
        this.contains = this.includes(tree);
    }
    includes(tree){
        if(tree==null) return false;
        let query=this.f;
        if(tree.data == query) return true;
        return tree.data > query?
            this.includes(tree.left): 
            this.includes(tree.right);
    }
}


class BinaryTree extends Tree{
    constructor(data){
        super(data);
    }
    insert(newData){
        let i = new InsertVisitor(newData);
        this.accept(i);
        return i.newTree;
    }
    contains(n){
        let i = new ContainsVisitor(n);
        this.accept(i);
        return i.contains;
    }
}