import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";


function Grid({ type }: { type: string }) {
  const router = useRouter();

  return (
    <div>
      <h1>search bar</h1>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {},
  }
}

export default Grid
