import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query MyQuery {
    memos {
      id
      title
    }
  }
`;

const HasuraView = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    console.log(error);

    return <div>error!!!!!!!!</div>;
  }

  console.log(data);
  return <div>HasuraView</div>;
};

export default HasuraView;
