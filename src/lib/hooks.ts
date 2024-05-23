


import { toast } from "@/components/ui/use-toast";
import {
    useInnovationsDeleteMutation,
    useInnovationsLikesCreateMutation,
    useInnovationsBookmarksCreateMutation,
    useInnovationsUnbookmarkMutation,
    useInnovationsUnlikeMutation,
} from "@/redux/features/innovations/innovationsApiSlice";

const useLikeInnovation = (id: string) => {
    //liking an innovation
    const [likeInnovation, { error: likeError }] = useInnovationsLikesCreateMutation();
    const handleLike = (id: string) => {
        likeInnovation({ id: id })
            .unwrap()
            .then(() => {
                toast({
                    description: "added to your liked innovation",
                });
            })
            .catch((error) => console.log(error))
    };
    return () => handleLike(id)
}

const useUnlikeInnovation = (id: string) => {
    //unliking an innovation
    const [unlikeInnovation, { error: unlikeError }] = useInnovationsUnlikeMutation()
    const handleUnlike = (id: string) => {
        unlikeInnovation({ id })
            .unwrap()
            .then(() => {
                toast({
                    description: "Removed from your liked innovations",
                });
            })
            .catch((error) => {
                console.log(error);
                console.log(unlikeError);
                toast({
                    title: "Something went wrong",
                    description: "There was a problem with your unlike request",
                });
            });
    };

    return () => handleUnlike(id)
}
const useBookmarkInnovation = (id: string) => {
//bookmarking an innovation
const [bookmarkInnovaion, { error: bookmarkError }] = useInnovationsBookmarksCreateMutation()
const handleBookmark = (id: string) => {
    bookmarkInnovaion({ id: id })
        .unwrap()
        .then(() => {
            toast({
                description: "added to your bookmarked innovations"
            })
        })
        .catch((error) => {
            console.log(error)
            console.log(bookmarkError)
        })
}

return () => handleBookmark(id)
}

const useUnbookmarkInnovation = (id: string) => {

//unbookmarking an innovation
const [unbookmarkInnovation, { error: unbookmarkError }] = useInnovationsUnbookmarkMutation()
const handleUnbookmark = (id: string) => {
    unbookmarkInnovation({ id: id })
        .unwrap()
        .then(() => {
            toast({
                description: "Removed from your bookmarked innovations",
            });
        })
        .catch((error) => {
            console.log(error);
            console.log(unbookmarkError);
            toast({
                title: "Something went wrong",
                description: "There was a problem with your unbookmark request",
            });
        });
};

return () => handleUnbookmark(id)
}

export {
    useBookmarkInnovation,
    useLikeInnovation,
    useUnlikeInnovation,
    useUnbookmarkInnovation,
}