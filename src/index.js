import "./style.css";
import LinkedList from "./modules/linked-list";

const list = LinkedList();

list.append("hello");
list.append("sir");
list.append("goodbye");
console.log(list.toString());

list.insertAt("Jacob", 2);
console.log(list.toString());
