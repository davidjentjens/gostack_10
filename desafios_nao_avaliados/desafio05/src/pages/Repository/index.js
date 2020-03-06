import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaSpinner, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import api from '../../services/api';

import { Container } from '../../components/Container';
import {
  Loading,
  Owner,
  IssueList,
  StateButtons,
  LoadingIssues,
  PageButtons,
  PageButton
} from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string
      })
    }).isRequired
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    issueState: 'all',
    loadingIssues: false,
    currentPage: 1
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5
        }
      })
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false
    });
  }

  async filter(state) {
    const { match } = this.props;
    this.setState({ issueState: state, loadingIssues: true });

    const { issueState } = this.state;
    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: issueState,
        per_page: 5
      }
    });

    this.setState({ issues: issues.data, loadingIssues: false });
  }

  async paginate(direction) {
    const { match } = this.props;
    this.setState({ loadingIssues: true });

    const { issueState } = this.state;
    let { currentPage } = this.state;
    const repoName = decodeURIComponent(match.params.repository);

    if (direction === 'right') {
      currentPage += 1;
    } else {
      currentPage -= 1;
    }

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: issueState,
        per_page: 5,
        page: currentPage
      }
    });

    this.setState({ issues: issues.data, loadingIssues: false, currentPage });
  }

  render() {
    const {
      repository,
      issues,
      loading,
      loadingIssues,
      currentPage
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    console.log(currentPage);

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <StateButtons>
          <li>
            <button type="button" onClick={() => this.filter('all')}>
              All
            </button>
          </li>
          <li>
            <button type="button" onClick={() => this.filter('open')}>
              Open
            </button>
          </li>
          <li>
            <button type="button" onClick={() => this.filter('closed')}>
              Closed
            </button>
          </li>
        </StateButtons>

        {loadingIssues ? (
          <LoadingIssues>
            <FaSpinner fontSize="100px" color="#7159c1" />
          </LoadingIssues>
        ) : (
          <IssueList>
            {issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels.map(label => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))}
          </IssueList>
        )}
        <PageButtons>
          <li>
            <PageButton
              onClick={() => this.paginate('left')}
              buttonDisabled={currentPage === 1}
            >
              <FaAngleLeft />
            </PageButton>
          </li>
          <li>
            <h4>{currentPage}</h4>
          </li>
          <li>
            <PageButton
              onClick={() => this.paginate('right')}
              buttonDisabled={false}
            >
              <FaAngleRight />
            </PageButton>
          </li>
        </PageButtons>
      </Container>
    );
  }
}
