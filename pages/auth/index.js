export default function index() {
  return (
    <></>
  );
}

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/auth/login',
      permanent: true,
    },
  };
}
