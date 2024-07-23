import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import TagsList from './components/TagsList'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    task: '',
    tag: tagsList[0].optionId,
    tasksList: [],
    activeId: '',
  }

  onChangeTextInput = event => {
    this.setState({task: event.target.value})
  }

  onChangeSelectOptionInput = event => {
    this.setState({tag: event.target.value})
  }

  onClickFormSubmit = event => {
    event.preventDefault()
    const {task, tag} = this.state
    const taskData = {
      id: uuidv4(),
      taskText: task,
      tagText: tag,
    }
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, taskData],
      task: '',
      tag: tagsList[0].optionId,
    }))
  }

  onToggleSelectTag = optionId => {
    this.setState({activeId: optionId})
  }

  render() {
    const {task, tag, tasksList, activeId} = this.state

    const filterTasksList =
      activeId === ''
        ? tasksList
        : tasksList.filter(each => each.tagText === activeId)

    return (
      <div className="app-container">
        <form className="form-container" onSubmit={this.onClickFormSubmit}>
          <h1 className="main-heading">Create a task!</h1>

          <div className="form-card">
            <label htmlFor="textInput" className="label-heading">
              Task
            </label>
            <input
              className="input"
              id="textInput"
              placeholder="Enter the task here"
              type="text"
              value={task}
              onChange={this.onChangeTextInput}
            />
          </div>

          <div className="form-card">
            <label htmlFor="optionInput" className="label-heading">
              Tags
            </label>
            <select
              id="optionInput"
              className="input"
              value={tag}
              onChange={this.onChangeSelectOptionInput}
            >
              {tagsList.map(each => (
                <option value={each.optionId} key={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>

          <button className="add-btn" type="submit">
            Add Task
          </button>
        </form>

        <div className="result-container">
          <h1 className="title-heading">Tags</h1>
          <ul className="tags-list-container">
            {tagsList.map(each => (
              <TagsList
                key={each.optionId}
                tagsListDetails={each}
                onToggleSelectTag={this.onToggleSelectTag}
                isActive={each.optionId === activeId}
              />
            ))}
          </ul>

          <h1 className="title-heading">Tasks</h1>
          {filterTasksList.length === 0 ? (
            <div className="no-tasks-container">
              <p className="no-tasks-heading">No Tasks Added Yet</p>
            </div>
          ) : (
            <ul className="tasks-list-container">
              {filterTasksList.map(each => (
                <li className="task-card" key={each.id}>
                  <p className="task-heading">{each.taskText}</p>
                  <p className="tag-heading">{each.tagText}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
