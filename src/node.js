class Node
{
    constructor(data, priority)
    {
        this.data = data;
        this.priority = priority;
        this.left = null;
        this.parent = null;
        this.right = null;
    }

    appendParent(node)
    {
        if (this.parent == null) this.parent = node;
    }

    appendChild(node)
    {
        if (this.left == null)
        {
            this.left = node;
            node.appendParent(this);
        }
        else if (this.right == null)
        {
            this.right = node;
            node.appendParent(this);
        }
        else return;
    }

    removeChild(node)
    {
        if (this.left === node)
        {
            this.left = null;
            node.parent = null;
        }
        else if (this.right === node)
        {
            this.right = null;
            node.parent = null;
        }
        else throw new Error("Please, check your argument!");
    }

    remove()
    {
        if (this.parent == null) return;
        else this.parent.removeChild(this);
    }

    copyNode()
    {
        var copy = {};
        for (var key in this) copy[key] = this[key];
        return copy;
    }

    swapWithParent()
    {
        if (this.parent == null) return;

        var copyParent = this.parent.copyNode();
        var copyChild = this.copyNode();
        if (this.parent.parent != null && this.parent.parent.left === this.parent)
            this.parent.parent.left = this;
        else if (this.parent.parent != null && this.parent.parent.right === this.parent)
            this.parent.parent.right = this;

        if (this.left != null)
        {
            this.parent.left = this.left;
            this.parent.left.parent = this.parent;
        }
        else this.parent.left = null;

        if (this.right != null)
        {
            this.parent.right = this.right;
            this.parent.right.parent = this.parent;
        }
        else this.parent.right = null;

        if (this === copyParent.right)
        {
            if (copyParent.left != null)
            {
                this.left = copyParent.left;
                this.left.parent = this;
            }
            else this.left = null;
            this.right = copyChild.parent;
            this.parent.parent = copyParent.right;
        }

        else if (this === copyParent.left)
        {
            if (copyParent.right != null)
            {
                this.right = copyParent.right;
                this.right.parent = this;
            }
            else this.right = null;
            this.left = copyChild.parent;
            this.parent.parent = copyParent.left;
        }
        this.parent = copyParent.parent;
    }

}


module.exports = Node;
