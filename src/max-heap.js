const Node = require('./node');

class MaxHeap
    {
    constructor()
    {
        this.allNodes = new Array();
        this.parentNodes = new Array();
        this.root = null;
    }

    push(data, priority)
    {
        this.insertNode(new Node(data, priority));
        var nodePosition = this.parentNodes.length - 1;
        this.shiftNodeUp(this.parentNodes[nodePosition]);
    }

    pop()
    {
        if (this.isEmpty() == true) return;
        var value = this.root.data;
        var detached = this.detachRoot();
        if (detached != null) {
            if (this.allNodes.length == 0)
            {
                this.restoreRootFromLastInsertedNode(new Node());
                this.shiftNodeDown(detached);
            }
            else
            {
                this.restoreRootFromLastInsertedNode(detached);
                this.shiftNodeDown(this.root);
            }
        }
        return value;
    }

    detachRoot()
    {
        if (this.root == null) return;
        var node = this.root;
        this.root = null;
        if (node.left == null || node.right == null)
        {
            this.parentNodes.shift();
        }
        this.allNodes.shift();
        return node;
    }

    restoreRootFromLastInsertedNode(detached)
    {
        if (detached.priority == null) return;
        var nodePosition = this.allNodes.length - 1;
        var newRoot = this.allNodes[nodePosition];
        this.root = newRoot;
        this.allNodes.unshift(newRoot);

        if (detached.right != null)
        {
            newRoot.right = detached.right;
            detached.right.parent = newRoot;
        }
        else newRoot.right = null;

        if (detached.left != null)
        {
            newRoot.left = detached.left;
            detached.left.parent = newRoot;
        }
        else newRoot.left = null;
        if ((this.allNodes.length - 1) % 2 == 0)
        {
            newRoot.parent.right = null;
            newRoot.parent = null;
        }
        else if ((this.allNodes.length - 1) % 2 != 0)
        {
            newRoot.parent.left = null;
            newRoot.parent = null;
        }
        this.allNodes.shift();
        this.parentNodesInitialization();
    }

    size()
    {
        return this.allNodes.length;
    }

    isEmpty()
    {
        return this.allNodes.length == 0;
    }

    clear()
    {
        this.parentNodes = [];
        this.allNodes = [];
        this.root = null;
    }

    insertNode(node)
    {
        if (this.root == null) {
            this.root = node;
        }
        else if (this.parentNodes.length > 0)
        {
            for (var i = 0; i < this.parentNodes.length; ++i)
            {
                if (this.parentNodes[i].right == null)
                {
                    this.parentNodes[i].appendChild(node);
                    break;
                }
                else continue;
            }
        }
        this.parentNodesInitialization()
    }

    shiftNodeUp(node)
    {
        if (node.parent == null)
        {
            this.root = node;
            return;
        }
        else if (node.parent.priority < node.priority)
        {
            node.swapWithParent();
            this.shiftNodeUp(node);
        }
        else return;
        this.parentNodesInitialization();

    }

    parentNodesInitialization()
    {
        if (this.root != null)
        {
            this.allNodesInitialization();
            this.parentNodes = [];
            for (var i = 0; i < this.allNodes.length; ++i)
            {
                if ((this.allNodes[i].left != null) && (this.allNodes[i].right != null)) continue;
                this.parentNodes.push(this.allNodes[i]);
            }
        }
    }

    allNodesInitialization()
    {
        this.allNodes = [];
        this.allNodes.push(this.root);
        var i = 0;
        while (this.allNodes[i].left != null)
        {
            this.allNodes[this.allNodes.length] = this.allNodes[i].left;
            if (this.allNodes[i].right != null)
            {
                this.allNodes[this.allNodes.length] = this.allNodes[i].right;
            }
            ++i;
        }
    }

    rootInitialization(node)
    {
        if (node.parent == null) this.root = node;
        else this.rootInitialization(node.parent);
    }

    shiftNodeDown(node)
    {
        if ((node.left != null) && (node.left.priority > node.priority) || (node.right != null) && (node.right.priority > node.priority))
        {
            if (node.right != null)
            {
                node.right.priority > node.left.priority ? node.right.swapWithParent() : node.left.swapWithParent();
            }
            else node.left.swapWithParent();
        }
        else return;
        this.shiftNodeDown(node);
        this.rootInitialization(node);
        this.parentNodesInitialization();
    }
}

module.exports = MaxHeap;
