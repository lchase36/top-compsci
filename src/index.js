import "./style.css";
import LinkedList from "./modules/linked-list";
import Tree from "./modules/balanced-bst";
import knightMoves from "./modules/knights-travails";

const list = LinkedList();

list.append("hello");
list.append("sir");
list.append("goodbye");
console.log(list.toString());

list.insertAt("Jacob", 2);
console.log(list.toString());

const tree = Tree();
console.log(`Tree is Balanced: ${tree.isBalanced()}`);

console.log("Level order:");
console.log(tree.levelOrder());

console.log("preorder:");
console.log(tree.preOrder());

console.log("postorder:");
console.log(tree.postOrder());

console.log("inorder:");
console.log(tree.inOrder());

console.log("Appending Values...");
tree.insertNode(132);
tree.insertNode(1838);
tree.insertNode(343);

console.log(`Tree is Balanced: ${tree.isBalanced()}`);

console.log("Rebalancing Tree..");
tree.reBalance();

console.log(`Tree is Balanced: ${tree.isBalanced()}`);

console.log("Level order:");
console.log(tree.levelOrder());

console.log("preorder:");
console.log(tree.preOrder());

console.log("postorder:");
console.log(tree.postOrder());

console.log("inorder:");
console.log(tree.inOrder());

console.log(knightMoves([3, 3], [3, 3]));
