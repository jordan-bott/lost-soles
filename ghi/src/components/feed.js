import { useGetSocksQuery } from "../store/socksApi";

function SockFeed() {
  const { data, error, isLoading } = useGetSocksQuery();

  if (isLoading) {
    return <p>Hello</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Sock ID</th>
          <th>User ID</th>
        </tr>
      </thead>
      <tbody>
        {data.map((sock) => (
          <tr key={sock.id}>
            <td>{sock.id}</td>
            <td>{sock.user_id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default SockFeed;
