import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from ".";

//get

const exchangeData = async (date: string[] | undefined, pageIndex: number) => {
    const response = await api.get(
        `cashflow/exchange-rates/from-to-for-management-toviewexchangerate?${date && date?.length >= 2 && date[0] && date[1]
            ? `DateFrom=${date[0]}&DateTo=${date[1]}&`
            : ""
        }Params.PageSize=20&Params.PageIndex=${pageIndex}`
    );
    return response.data;
};
export const useExchangeData = (
    date: string[] | undefined,
) => {
    return useInfiniteQuery({
        queryKey: ["exchangeData", date],
        queryFn: ({ pageParam = 1 }) => {
            return exchangeData(date, pageParam);
        },
        // staleTime: 400,
        // refetchOnWindowFocus: false,
        initialPageParam: 1,
        getNextPageParam: (lastPage: string | any[], allPages: string | any[]) => {
            if (lastPage.length >= 20) {
                return allPages.length + 1;
            } else {
                return undefined;
            }
        },

    });

};

// Post


export const useChangeSwap = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (
            data: {
                currency: string;
                exchangeRateOfBank: number;
                exchangeRateOfObmen: number;
            }) => api.post("/cashflow/exchange-rates", data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['exchangeData'] });
        },
    });

    return {
        ...mutation,
        // isPending: mutation.status === 'pending', 
        status: {
            isPending: mutation.status === 'pending',
            isSuccess: mutation.status === 'success',
            isError: mutation.status === 'error',
            isIdle: mutation.status === 'idle',
        },
    };
};
