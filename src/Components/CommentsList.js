const CommentsList = (props) => {
  return (
    <li className="text-white font-bold lg:text-3xl w-full  border-b border-white  ">
      {props.comment}
    </li>
  );
};
export default CommentsList;
