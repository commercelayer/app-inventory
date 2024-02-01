import { makeStockItem } from '#mocks'
import {
  Avatar,
  Badge,
  ListItem,
  Spacer,
  Text,
  withSkeletonTemplate
} from '@commercelayer/app-elements'
import type { StockItem } from '@commercelayer/sdk'

interface Props {
  resource?: StockItem
  isLoading?: boolean
  delayMs?: number
}

export const ListItemStockItem = withSkeletonTemplate<Props>(
  ({ resource = makeStockItem() }): JSX.Element | null => {
    return (
      <ListItem
        tag='div'
        icon={
          <Avatar
            alt={resource.sku?.name ?? ''}
            src={resource.sku?.image_url as `https://${string}`}
          />
        }
        alignItems='center'
      >
        <div>
          <Text tag='div' weight='medium' variant='info' size='small'>
            {resource.sku?.code}
          </Text>
          <Text tag='div' weight='semibold'>
            {resource.sku?.name}
          </Text>
          {resource.reserved_stock != null && (
            <Spacer top='1'>
              <Badge variant='warning' icon='lockSimple'>
                {resource.reserved_stock?.quantity} reserved
              </Badge>
            </Spacer>
          )}
        </div>
        <div>
          <Text weight='semibold'>x {resource.quantity}</Text>
        </div>
      </ListItem>
    )
  }
)
