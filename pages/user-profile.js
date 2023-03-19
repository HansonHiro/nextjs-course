function UserProfilePage(props) {
  return <h1>Hanson</h1>;
}

export default UserProfilePage;

export async function getServerSideProps(context) {
  const { params, req, res } = context; // req res are official node js objects for incoming message.

  //   console.log(req);
  //   console.log(res);

  return {
    props: {
      username: "Hanson",
    }, // localhost:3000/user-profile (after deployment will work, not pre-rendered)
  };
}
