import {Component} from 'react'
import {v4} from 'uuid'
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

// Replace your code here

const EachTask = props => {
  const {details} = props
  const {task, tag} = details
  const findItem = tagsList.find(item => item.optionId === tag)
  return (
    <li className="task-list-item">
      <p className="task-para">{task}</p>
      <p className="tag-para">{findItem.displayText}</p>
    </li>
  )
}

const TagItem = props => {
  const {details, onClickTagButton} = props
  const {displayText, optionId, isTrue} = details
  const buttonClass = isTrue ? 'bg-button' : 'tag-button'
  const onClickTag = () => {
    onClickTagButton(optionId)
  }
  return (
    <li>
      <button type="button" className={buttonClass} onClick={onClickTag}>
        {displayText}
      </button>
    </li>
  )
}

class App extends Component {
  state = {
    task: '',
    tag: tagsList[0].optionId,
    list: [],
    selectTag: '',
    newList: tagsList,
  }

  onChangeSelect = event => {
    this.setState({tag: event.target.value})
  }

  onChangeTask = event => {
    this.setState({task: event.target.value})
  }

  onClickTagButton = button => {
    const {newList} = this.state
    const findItem = newList.find(item => item.optionId === button)
    if (findItem.isTrue === false) {
      const filteredList = newList.map(item => {
        if (item.optionId === button) {
          return {...item, isTrue: true}
        }
        return {...item, isTrue: false}
      })
      console.log(filteredList)
      this.setState({newList: filteredList, selectTag: button})
    }
    if (findItem.isTrue === true) {
      const filteredList = newList.map(item => {
        if (item.optionId === button) {
          return {...item, isTrue: false}
        }
        return item
      })
      console.log(filteredList)
      this.setState({newList: filteredList, selectTag: ''})
    }
  }

  onSubmitTask = event => {
    event.preventDefault()
    const {tag, task} = this.state
    if (task === '') {
      // eslint-disable-next-line
      alert('Enter the task')
    } else {
      const taskValue = {
        id: v4(),
        task,
        tag,
      }
      this.setState(prevState => ({
        list: [...prevState.list, taskValue],
        task: '',
        tag: tagsList[0].optionId,
      }))
    }
  }

  render() {
    const {tag, list, selectTag, task, newList} = this.state
    const filteredList = list.filter(item => item.tag.includes(selectTag))
    console.log(selectTag)
    return (
      <div className="bg-container">
        <form className="form-container" onSubmit={this.onSubmitTask}>
          <h1 className="heading">Create a task!</h1>
          <div className="input-container">
            <label htmlFor="task" className="label">
              Task
            </label>
            <input
              type="text"
              placeholder="Enter the task here"
              id="task"
              className="input"
              value={task}
              onChange={this.onChangeTask}
            />
          </div>

          <div className="input-container">
            <label htmlFor="tags" className="label">
              Tags
            </label>
            <select
              id="tags"
              className="input"
              value={tag}
              onChange={this.onChangeSelect}
            >
              {tagsList.map(each => (
                <option key={each.option} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="add-button">
            Add Task
          </button>
        </form>
        <div className="container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="ul-container">
            {newList.map(each => (
              <TagItem
                key={each.optionId}
                details={each}
                onClickTagButton={this.onClickTagButton}
              />
            ))}
          </ul>

          <h1 className="tags-heading">Tasks</h1>
          <ul className="tasks-container">
            {filteredList.length === 0 ? (
              <div className="no-task-para">
                <p className="no-task-para">No Tasks Added Yet</p>
              </div>
            ) : (
              filteredList.map(each => (
                <EachTask key={each.optionId} details={each} />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}
export default App
