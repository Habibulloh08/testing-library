import { Button, Input, message, } from "antd"
import { useEffect, useState } from "react"
import { useChangeSwap, useExchangeData } from "../api/Exchange";
import { useInView } from "react-intersection-observer";


const ExchangeModal = ({ setExchangeModal }: any) => {
    const { ref, inView } = useInView();
    const { mutate: addMutationExchange, status } = useChangeSwap();
    const {
        data: exchange,
        fetchNextPage,
        hasNextPage,
        isLoading
    } = useExchangeData([])
    const [buyRate, setBuyRate] = useState<string | number | undefined>(undefined);
    const [saleRate, setSaleRate] = useState<string | number | undefined>(undefined);

    const handleButtonClick = () => {
        if (!buyRate || !saleRate) {
            message.warning('Поле не может быть пустым.')
        } else {
            const userSwap = {
                currency: "USD",
                exchangeRateOfBank: Number(buyRate),
                exchangeRateOfObmen: Number(saleRate),
            };
            addMutationExchange(userSwap, {
                onSuccess: () => {

                    message.success('добавлен курс доллара')
                    setBuyRate("");
                    setSaleRate("");
                    // setExchangeModal(false);
                },
                onError: (error: any) => {
                    message.error(error.response?.data.message)
                },
            });
        }
    };
    const data = exchange?.pages?.flatMap((page: any) => page) || [];
    useEffect(() => {
        if (inView) {
            hasNextPage ? fetchNextPage() : null;
        }
    }, [fetchNextPage, inView]);
    return (
        <div>
            <h1 className="text-center text-lg font-semibold">ExchangeModal</h1>
            <div className="flex items-center gap-2 mb-2">
                <Input
                    placeholder="Введите курс банка"
                    value={buyRate}
                    onChange={(e) => setBuyRate(e.target.value.replace(/[^\d]/g, ''))}
                    maxLength={6}
                />
                <Input
                    placeholder="Введите курс обмена"
                    value={saleRate}
                    onChange={(e) => setSaleRate(e.target.value.replace(/[^\d]/g, ''))}
                    maxLength={6}
                />
            </div>
            <Button
                loading={status.isPending}
                type="primary"
                onClick={handleButtonClick}
            >
                Изменить курс
            </Button>
            <div className="max-h-[400px] overflow-scroll mt-2">
                {
                    isLoading ? <p>Loading...</p> :
                        data?.length === 0 ? <p>Нет данных</p> :
                            data?.map((item: any) => (
                                <div key={item.id} className="flex items-center gap-2">
                                    {/* <p>{item.id}</p> */}
                                    {/* <p>{item.createdAt}</p> */}
                                    <p>{item.buyRate}</p>
                                    <p>{item.saleRate}</p>
                                </div>
                            ))}
            </div>
        </div>
    );
};

export default ExchangeModal;