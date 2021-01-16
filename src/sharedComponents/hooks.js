
import { useLocation } from 'react-router-dom'
import { useSelector, shallowEqual } from 'react-redux'
import { useState, useEffect } from 'react'

export function usePkceValues () {
  const [pkceValues, setNewPkceValues] = useState()

  { /* useEffect(() => {
    setNewPkceValues(getPkceValues())
    if (!pkceValues) {
  const newPkceValues = generatePkceValues()
      setNewPkceValues(newPkceValues)
      setPkceValues(newPkceValues)
    }
  }, [pkceValues]) */ }

  return pkceValues
}

export function useQueryObject () {
  const { search } = useLocation()
  const [parms, setParms] = useState({})

  useEffect(() => {
    setParms(Array.from(new URLSearchParams(search)).reduce(
      (acc, [key, value]) => Object.assign(acc, { [key]: value }),
      {}
    ))
  }, [search])

  return parms
}

export function useQuery () {
  return new URLSearchParams(useLocation().search)
}

export function useIsLoading (isLoaded) {
  return isLoaded
}

export function useAuthorizations () {
  const trustedClaims = useSelector(state => state.auth.trustedClaims, shallowEqual)
  const userDetails = useSelector(state => state.auth.userDetails, shallowEqual)
  const isEmployee = useSelector(state => state.auth.isEmployee)

  return { trustedClaims, userDetails, isEmployee }
}

export function isValidLink (value) {
  return (!/^https..*.docudio.com.*$/.test(value))
}

export function useQueryString (obj) {
  return Object.keys(obj).map(key => key + '=' + obj[key]).join('&')
}
