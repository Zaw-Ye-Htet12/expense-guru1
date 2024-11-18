import TransactionDetail from "@/components/common/transactionDetail";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  
  return (
    <>
      <TransactionDetail id={id}/>
    </>
  );
};

export default Page;
