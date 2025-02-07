import OptimizedImage from '@/components/common/OptimizedImage';

type ResultErrorProps = {
  message?: string;
};

const ResultError = ({
  message = '화면을 불러올 수 없어요.\n잠시 후 다시 시도해 주세요!',
}: ResultErrorProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center pt-0 xl:justify-start xl:pt-16">
      <section className="flex flex-col items-center">
        <OptimizedImage
          src="/assets/Error_Image.svg"
          alt="에러 이미지"
          width={106}
          height={124}
          className="mb-5"
        />

        <div className="mb-9 flex flex-col items-center text-center text-body-mm text-grayscale-700">
          {message.split('\n').map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResultError;
