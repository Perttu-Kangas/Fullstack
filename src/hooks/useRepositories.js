import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (sort, keyword) => {

    const { data, ...result } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: {
            ...sort,
            searchKeyword: keyword
        }
    });

    return { repositories: data ? data.repositories : undefined, ...result };
};

export default useRepositories;