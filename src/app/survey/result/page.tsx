import OpenAI from 'openai';

const openai = new OpenAI({
  organization: process.env.ORGANIZATION_ID,
  project: process.env.PROJECT_ID,
  apiKey: process.env.CHATGPT_API_KEY,
});

// 전체는 서버컴포넌트로
const Page = async () => {
  return <div>Recommended</div>;
};

export default Page;
