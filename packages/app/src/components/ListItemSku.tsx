import {
  Avatar,
  Icon,
  ListItem,
  Text,
  withSkeletonTemplate
} from '@commercelayer/app-elements'
import type { Sku } from '@commercelayer/sdk'
import { makeSku } from 'src/mocks/resources/skus'

type ListItemSkuVariant = 'list' | 'card'

interface Props {
  resource?: Sku
  variant: ListItemSkuVariant
  disabled?: boolean
  onSelect?: (resource: Sku) => void
}

export const ListItemSku = withSkeletonTemplate<Props>(
  ({ resource = makeSku(), variant, disabled = false, onSelect }) => {
    const listItemCss = `${variant === 'card' ? 'rounded border' : ''} ${disabled ? 'bg-gray-50' : ''}`

    return (
      <ListItem
        tag='a'
        onClick={(e) => {
          e.preventDefault()
          if (onSelect != null) {
            onSelect(resource)
          }
        }}
        icon={
          <Avatar
            alt={resource.name}
            src={resource.image_url as `https://${string}`}
          />
        }
        className={listItemCss}
      >
        <div>
          <Text tag='div' variant='info' weight='semibold'>
            {resource.code}
          </Text>
          <Text tag='div' weight='bold'>
            {resource.name}
          </Text>
        </div>
        {variant === 'card' && !disabled && (
          <Icon
            name='pencilSimple'
            size='18'
            weight='bold'
            className='text-primary'
          />
        )}
      </ListItem>
    )
  }
)
