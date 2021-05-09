class Visitor{
    constructor(f){
        this.f = f;
    }
    visitTree(tree){}
}

class InOrderVisitor extends Visitor{
    visitTree(tree){
        if(tree == null) return;
        this.visitTree(tree.left);
        this.f(tree.data);
        this.visitTree(tree.right);
    }
}

class PreOrderVisitor extends Visitor{
    visitTree(tree){
        if(tree == null) return;
        this.f(tree.data);
        this.visitTree(tree.left);
        this.visitTree(tree.right);
    }
}

class PostOrderVisitor extends Visitor{
    visitTree(tree){
        if(tree == null) return;
        this.visitTree(tree.left);
        this.visitTree(tree.right);
        this.f(tree.data);
    }
}