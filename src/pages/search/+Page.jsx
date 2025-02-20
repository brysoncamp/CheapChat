import ChatOrPage from "../../components/ChatOrPage/ChatOrPage";

const SearchPage = (props) => {
  return (
    <ChatOrPage
      {...props}
      pageContent={
        <div>
          <h1>Search</h1>
        </div>
      }
    />
  );
};

export default SearchPage;
