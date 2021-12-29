import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

interface Query {
  id: string;
  
}

function Grid() {
  const { query: Query } = useRouter();

  return (
    <div>
      
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {},
  }
}

export default Grid
