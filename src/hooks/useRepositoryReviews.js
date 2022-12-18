import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_REVIEWS } from "../graphql/queries";

const useRepositoryReview = ({ id, first }) => {

    const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY_REVIEWS, {
        fetchPolicy: 'cache-and-network',
        variables: { id, first },
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                id,
                first
            },
        });
    };

    return {
        reviews: data?.repository.reviews,
        fetchMore: handleFetchMore,
        loading,
        ...result,
    };
};

export default useRepositoryReview;