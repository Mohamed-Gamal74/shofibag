const Heading = ({ head, para }) => {
  return (
    <div className="text-center mb-5">
      <h2 className="w__700 zenDots">{head}</h2>
      <p className="text-black-50">{para}</p>
    </div>
  );
};

export default Heading;
