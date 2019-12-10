import { Controller } from 'stimulus'
import validate from 'validate.js'

export default class extends Controller {
  static targets = ['form', 'input']

  onSubmit(event) {
    event.preventDefault()

    const errors = validate(this.formTarget, this.constraints())

    if (errors == null) {
      this.formTarget.submit()
    } else {
      this.showErrors(errors)
    }
  }

  constraints() {
    let constraints = {}

    for (let input of this.inputTargets) {
      constraints[input.name] = JSON.parse(
        input.getAttribute('data-validate')
      )
    }

    return constraints
  }

  showErrors(errors) {
    for (let input of this.inputTargets) {
      this.showErrorForInput(input, errors[input.name])
    }
  }

  showErrorForInput(input, errors) {
    this.clearMessages(input)
    if (errors) {
      input.classList.add('is-invalid')
      this.insertErrorMessage(input, errors)
    } else {
      if (input.classList.contains('is-invalid')) {
        this.insertSuccessMessage(input)
      }
      input.classList.add('is-valid')
      input.classList.remove('is-invalid')
    }
  }

  clearMessages(input) {
    let error = document.getElementById(`error_${input.name}`)
    let success = document.getElementById(`success_${input.name}`)

    if (error != null) {
      error.remove()
    }

    if (success != null) {
      success.remove()
    }
  }

  insertErrorMessage(input, errors) {
    let html = document.createElement('div')
    html.innerHTML = errors.join(', ')
    html.id = `error_${input.name}`
    html.className = 'invalid-feedback'
    input.after(html)
  }

  insertSuccessMessage(input) {
    let html = document.createElement('div')
    html.innerHTML = 'Looks good!'
    html.id = `success_${input.name}`
    html.className = 'valid-feedback'
    input.after(html)
  }
}
