const ViewDetailBlog = ({ params }: { params: Promise<{ id: string }> }) => {
  return <>id = {params.id}</>;
};
export default ViewDetailBlog;
