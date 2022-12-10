import { Skeleton, Space } from "antd";

const SkeletonComp = () => {
  return (
    <div className="shadow py-5 borderRaduis" style={{height : '400px'}}>
      <Space className="d-flex flex-column ">
        <Skeleton.Image style={{ width: 200 }} className='mb-3' />
        <Skeleton.Input style={{ width: 200 }} active />
        <Skeleton.Input style={{ width: 200 }} active />
      </Space>
    </div>
  );
};

export default SkeletonComp;
