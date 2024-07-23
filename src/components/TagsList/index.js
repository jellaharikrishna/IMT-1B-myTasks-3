import './index.css'

const TagsList = props => {
  const {tagsListDetails, onToggleSelectTag, isActive} = props
  const {optionId, displayText} = tagsListDetails

  const onClickSelectTag = () => {
    onToggleSelectTag(optionId)
  }

  const tagClassName = isActive ? 'active-tag-btn' : 'tag-btn'

  return (
    <li>
      <button className={tagClassName} type="button" onClick={onClickSelectTag}>
        {displayText}
      </button>
    </li>
  )
}

export default TagsList
