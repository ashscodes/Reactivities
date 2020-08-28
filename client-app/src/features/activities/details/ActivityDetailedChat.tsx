import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Segment,
  Header,
  Form,
  Button,
  Comment,
  Checkbox,
} from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Form as FinalForm, Field } from "react-final-form";
import { Link } from "react-router-dom";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import { observer } from "mobx-react-lite";
import { formatDistance } from "date-fns";
import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
} from "revalidate";

const validate = combineValidators({
  body: composeValidators(
    hasLengthGreaterThan(1)({
      message: "Your comment should be at least two characters",
    })
  )(),
});

const ActivityDetailedChat = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    createHubConnection,
    stopHubConnection,
    addComment,
    activity,
    dateSortedComments,
  } = rootStore.activityStore;

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    createHubConnection(activity!.id);
    return () => {
      stopHubConnection();
    };
  }, [createHubConnection, stopHubConnection, activity]);

  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached clearing style={{ border: "none" }}>
        <FinalForm
          validate={validate}
          onSubmit={addComment}
          render={({ handleSubmit, submitting, form, pristine, invalid }) => (
            <Form onSubmit={() => handleSubmit()!.finally(() => form.reset())}>
              <Field
                name="body"
                component={TextAreaInput}
                rows={2}
                placeholder="Add your comment"
              />
              <Button
                content="Add Reply"
                labelPosition="left"
                icon="edit"
                primary
                loading={submitting}
                floated="right"
                disabled={pristine || invalid}
              />
            </Form>
          )}
        />
      </Segment>
      <Segment attached style={{ border: "none" }}>
        <Checkbox
          label="Hide Comments"
          onClick={() => setHidden(!hidden)}
        />
        {hidden ? (
          <div></div>
        ) : (
          <Comment.Group>
            {activity &&
              activity.comments &&
              dateSortedComments.map((comment) => (
                <Comment key={comment.id}>
                  <Comment.Avatar src={comment.image || "/assets/user.png"} />
                  <Comment.Content>
                    <Comment.Author
                      as={Link}
                      to={`profile/${comment.username}`}
                    >
                      {comment.displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>
                        {formatDistance(
                          new Date(comment.createdAt),
                          new Date()
                        )}
                      </div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.body}</Comment.Text>
                  </Comment.Content>
                </Comment>
              ))}
          </Comment.Group>
        )}
      </Segment>
    </Fragment>
  );
};

export default observer(ActivityDetailedChat);