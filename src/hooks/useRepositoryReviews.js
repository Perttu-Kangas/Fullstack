import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_REVIEWS } from "../graphql/queries";

const useRepositoryReview = (id) => {

    const { data, ...result } = useQuery(GET_REPOSITORY_REVIEWS, {
        fetchPolicy: 'cache-and-network',
        variables: { id },
    });

    return { reviews: data ? data.repository.reviews : undefined, ...result };
};

export default useRepositoryReview;