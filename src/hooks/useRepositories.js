import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ sort, keyword, first }) => {

    const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: {
            ...sort,
            searchKeyword: keyword,
            first
        }
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...sort,
                searchKeyword: keyword,
                first
            },
        });
    };

    return {
        repositories: data?.repositories,
        fetchMore: handleFetchMore,
        loading,
        ...result,
    };
};

export default useRepositories;