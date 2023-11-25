import "./style.css";
import LinkedList from "./modules/linked-list";
import Tree from "./modules/balanced-bst";

const list = LinkedList();

list.append("hello");
list.append("sir");
list.append("goodbye");
console.log(list.toString());

list.insertAt("Jacob", 2);
console.log(list.toString());

const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);

tree.prettyPrint(tree.root);

tree.inOrder((node) => {
  console.log(node);
});

console.log(tree.height(tree.find(7)));

console.log(tree.depth(tree.find(8)));
