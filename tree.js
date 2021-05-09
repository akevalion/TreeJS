class Tree{
    constructor(data){
        this.data = data;
        this.left = this.right = null;
    }
    accept(visitor){
        visitor.visitTree(this);
    }
    inorder(f){
        this.accept(new InOrderVisitor(f));
    }
    preorder(f){
        this.accept(new PreOrderVisitor(f));
    }
    postorder(f){
        this.accept(new PostOrderVisitor(f));
    }
    toString(){
        let c = new PrettyTreeCreatorVisitor();
        this.accept(c);
        let prettyTree = c.prettyTree;
        c = new PrettyPrinterVisitor();
        prettyTree.accept(c);
        return c.result;
    }
    depthFirstForEach(f, mode){
        let v = mode == "pre-order"?
            new PreOrderVisitor(f):
            mode == "post-order"?
            new PostOrderVisitor(f): 
            new InOrderVisitor(f);
        this.accept(v);
    }
    size(){
        let size = 0;
        let v = new InOrderVisitor(function(x){
            size++;
        });
        this.accept(v);
        return size;
    }
    breadthFirstForEach(){
        let c = new PrettyTreeCreatorVisitor();
        this.accept(c);
        let prettyTree = c.prettyTree;
        c = new TreeGroupByVisitor('level');
        prettyTree.accept(c);
        let max = 0;
        for(let each in c.groups){
            let v = c.groups[each].length;
            if(max < v) max = v;
        }
        return max;
    }
}