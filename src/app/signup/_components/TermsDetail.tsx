type TermsDetailProps = {
  terms: number | null;
  handleClose: (value: number | null) => void;
};

const TermsDetail = ({ terms, handleClose }: TermsDetailProps) => {
  return (
    <div className="absolute left-0 right-0 top-0 bg-white">
      <div className="mx-auto w-11/12 max-w-96 py-4">
        <div className="relative">
          <span
            className="absolute left-0 top-0 cursor-pointer text-lg"
            onClick={() => handleClose(null)}
          >
            &#60;
          </span>
          <h1 className="mb-8 text-center text-3xl font-bold">이용약관</h1>
        </div>

        <p className="text-xl font-bold">
          {terms === 1 ? '홈페이지 이용 약관' : '개인정보수집 및 이용동의'}
        </p>

        <p>
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
  );
};

export default TermsDetail;
