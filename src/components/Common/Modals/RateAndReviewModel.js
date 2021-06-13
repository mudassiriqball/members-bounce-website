import React, { useRef, useState } from "react";
import { Button } from "..";
import axios from "axios";
import { urls } from "helpers";

const RateAndReviewModel = props => {
  const { visible, onHide, user, data, token, chat } = props;
  const [etiquette, setEtiquette] = useState(0);
  const [paceOfPlay, setPaceOfPlay] = useState(0);
  const [overall, setOverall] = useState(0);
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRateReview = async () => {
    setIsLoading(true);
    await axios({
      method: 'PUT',
      url: urls.RATE_AND_REVIEW_PLAYER + data._id,
      headers: {
        'authorization': token
      },
      data: {
        review: {
          name: user.firstName + user.lastName,
          review: review,
        },
        etiquette,
        paceOfPlay,
        overall,
      }
    }).then(res => {
      setIsLoading(false);
      // toastRef.current.show('Your request was processed successfully.', CONSTS.TOAST_MEDIUM_DURATION, () => {
      //     onHide();
      // });
    }).catch(err => {
      console.log('handleRateReview err:', err);
      setIsLoading(false);
      // toastRef.current.show('Something wents wrong, Please try again later!', CONSTS.TOAST_MEDIUM_DURATION, () => {
      // });
    });
  }

  return (
    // <Modal
    //     animationType="slide"
    //     transparent={true}
    //     visible={visible}
    // >
    //     <EasyToast
    //         toastRef={toastRef}
    //         type={toastType}
    //         position={'top'}
    //     />
    //     <View style={filterModelStyles.centeredView}>
    //         <View style={filterModelStyles.modalView}>
    //             <View style={filterModelStyles.header(colors)}>
    //                 <Text style={{ fontSize: 16 }}>Rate & Review</Text>
    //                 <TouchableOpacity disabled={isLoading} onClick={onHide}>
    //                     <Text style={{ fontSize: 16, color: colors.RED, opacity: isLoading ? 0.5 : 1 }}>Close</Text>
    //                 </TouchableOpacity>
    //             </View>
    //             <View style={styles.ratingView}>
    //                 <Subheading style={styles.label(colors)}>Etiquette</Subheading>
    //                 <Rating
    //                     type='star'
    //                     showRating
    //                     ratingCount={5}
    //                     imageSize={20}
    //                     fractions={0}
    //                     jumpValue={0}
    //                     isDisabled={isLoading}
    //                     onFinishRating={(val) => setEtiquette(val)}
    //                     startingValue={etiquette}
    //                     style={styles.rating}
    //                 />
    //             </View>
    //             <View style={styles.ratingView}>
    //                 <Subheading style={styles.label(colors)}>Pace of Play</Subheading>
    //                 <Rating
    //                     type='star'
    //                     showRating
    //                     ratingCount={5}
    //                     imageSize={20}
    //                     fractions={0}
    //                     isDisabled={isLoading}
    //                     jumpValue={0}
    //                     onFinishRating={(val) => setPaceOfPlay(val)}
    //                     startingValue={paceOfPlay}
    //                     style={styles.rating}
    //                 />
    //             </View>
    //             <View style={styles.ratingView}>
    //                 <Subheading style={styles.label(colors)}>Overall</Subheading>
    //                 <Rating
    //                     type='star'
    //                     showRating
    //                     ratingCount={5}
    //                     isDisabled={isLoading}
    //                     imageSize={20}
    //                     fractions={0}
    //                     jumpValue={0}
    //                     onFinishRating={(val) => setOverall(val)}
    //                     startingValue={overall}
    //                     style={styles.rating}
    //                 />
    //             </View>
    //             <View style={styles.ratingView}>
    //                 <Subheading style={[styles.label(colors), { marginBottom: -5 }]}>Review</Subheading>
    //                 <TextInput
    //                     placeholder={'Add your review here'}
    //                     multiline={true}
    //                     numberOfLines={10}
    //                     minHeight={Platform.OS === "ios" ? 20 * 10 : null}
    //                     textAlignVertical="top"
    //                     value={review}
    //                     editable={!isLoading}
    //                     placeholderTextColor={colors.PLACEHOLDER}
    //                     onChangeText={(text) => setReview(text)}
    //                     style={globalStyles.textArea(colors)}
    //                 />
    //             </View>
    //             <View style={styles.ratingView}>
    //                 <Button
    //                     title={'Submit'}
    //                     mode={'contained'}
    //                     disabled={isLoading}
    //                     loading={isLoading}
    //                     width='100%'
    //                     onClick={() => handleRateReview()}
    //                 />
    //             </View>
    //         </View>
    //     </View>
    // </Modal>
    <></>
  );
};

export default RateAndReviewModel;
