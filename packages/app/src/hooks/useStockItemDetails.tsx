import { isMockedId, makeStockItem } from '#mocks'
import { useCoreApi } from '@commercelayer/app-elements'
import type { StockItem } from '@commercelayer/sdk'
import type { KeyedMutator } from 'swr'

export function useStockItemDetails(id: string): {
  stockItem: StockItem
  isLoading: boolean
  error: any
  mutateStockItem: KeyedMutator<StockItem>
} {
  const {
    data: stockItem,
    isLoading,
    error,
    mutate: mutateStockItem
  } = useCoreApi(
    'stock_items',
    'retrieve',
    [
      id,
      {
        include: ['stock_location', 'sku', 'reserved_stock']
      }
    ],
    {
      isPaused: () => isMockedId(id),
      fallbackData: makeStockItem()
    }
  )

  return { stockItem, error, isLoading, mutateStockItem }
}
