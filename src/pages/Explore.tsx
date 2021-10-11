import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonSearchbar, IonThumbnail, IonImg, IonList, IonSlide, IonSlides, IonItemGroup, IonText, useIonViewDidEnter, useIonViewDidLeave, IonLoading } from '@ionic/react';
import { pin, wifi, wine, warning, walk, star, videocam, videocamOutline, searchCircleOutline, search, musicalNoteOutline, musicalNotesOutline, cameraOutline } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import { Link } from 'react-router-dom';
import './Explore.css';
import { useHistory } from 'react-router';
import db, { auth } from '../firebaseConfig';

const slideOpts = {
    initialSlide: 1,
    speed: 400,
    spaceBetween: 100,
    effect: 'fade',
    autoplay: {
        delay: 2000,
    },
};

type Item = {
    src: string;
    text: string;
};
const items: Item[] = [{ src: 'http://placekitten.com/g/200/300', text: '' }];


const Explore: React.FC = () => {
    const [trending, setTrending] = useState<any>([]);
    const [recommended, setRecommended] = useState<any>([]);
    const [popular, setPopular] = useState([]);
    const [newest, setNewest] = useState<any>([]);
    const [searchText, setSearchText] = useState('');
    const [busy, setBusy] = useState<boolean>(false)
    const history = useHistory();


    useIonViewDidEnter(() => {
        setBusy(true)
        newestData()
    });

    useIonViewDidLeave(() => {

    });

    const newestData = async () => {
        let items:String[] = []
        let email = auth.currentUser?.email
        await db.collection('user').orderBy('timestamp', 'desc').limit(5).get().then((result) => {
            if (!result.empty) {
                 result.docs.filter((doc: any) => {
                    if(doc.data().email !== auth.currentUser?.email){
                    let jsonObject: any = {id: doc.id,data: doc.data()}
                        items.push(jsonObject)
                    }
                });
                setNewest(items);
                recommendedData();
                //setBusy(false)
            } else {
                setBusy(false);
            }
        }).catch((error) => {
            console.log(error);
            setBusy(false)
        })
    }

    const recommendedData = async () => {
        let items:String[] = []
        let usercategory = localStorage.getItem("category");
        console.log(usercategory);
        await db.collection('user').where("category", "==", usercategory).orderBy('viewCount', 'desc').limit(5).get().then((result) => {
            if (!result.empty) {
                result.docs.filter((doc: any) => {
                    if(doc.data().email !== auth.currentUser?.email){
                    let jsonObject: any = {id: doc.id,data: doc.data()}
                        items.push(jsonObject)
                    }
                });
                setRecommended(items);
                setBusy(false);
                trendingData()
            } else {
                setBusy(false);
            }
        }).catch((error) => {
            console.log(error);
            setBusy(false)
        })
    }

    const trendingData = async () => {
        let items:String[] = []
        await db.collection('user').orderBy('viewCount', 'desc').limit(5).get().then((result) => {
            if (!result.empty) {
                result.docs.filter((doc: any) => {
                    if(doc.data().email !== auth.currentUser?.email){
                    let jsonObject: any = {id: doc.id,data: doc.data()}
                        items.push(jsonObject)
                    }
                });
                setTrending(items);
                setBusy(false);
            } else {
                setBusy(false);
            }
        }).catch((error) => {
            console.log(error);
            setBusy(false)
        })
    }

    const openSearchPage = () => {
        history.push("/search");
    }

    return (
        <IonPage>
            <IonLoading message="Please wait..." duration={0} isOpen={busy} />
            <IonContent>
                <IonSearchbar className="searchbarexplorer" value={searchText} onClick={openSearchPage}></IonSearchbar>{/* onIonChange={e => setSearchText(e.detail.value!)} */}
                { trending.length > 0 && (<h5 className="trendingtitle" >Trending</h5>)}
                { trending.length > 0 && (<IonButton className="showallbutton" color="warning" fill="clear" >View more</IonButton>)}
               
                <IonSlides className="ionslider" options={slideOpts} >
                    <IonSlide>
                        {trending.map((object: any, i: any) => {
                            return (
                                <IonCard className="londoncard" key={i}>
                                    <IonImg className="london" src={object.data.profilePicture} />
                                    <Link to={{ pathname: "/viewprofile/" + "" + object.data.username, state: { username: object.data.username, fromWhere: "search", id: object.id } }} style={{ textDecoration: "none" }}>
                                        <h5 className="trendingheader ion-text-capitalize" style={{ margin: "auto", padding: "2px 0px" }}>{object.data.firstname + " " + object.data.lastname}</h5>
                                    </Link>
                                    <IonCardSubtitle className="trendingcategory ion-text-capitalizer" style={{ margin: "auto", padding: "2px 0px" }}>{object.data.category}</IonCardSubtitle>
                                    <div className="explorestars" style={{ margin: "auto" }}>
                                        <IonIcon icon={star} size="small" color="warning" />
                                        <IonIcon icon={star} size="small" color="warning" />
                                        <IonIcon icon={star} size="small" color="warning" />
                                        <IonIcon icon={star} size="small" color="warning" />
                                        <IonIcon icon={star} size="small" color="warning" />
                                    </div>
                                </IonCard>
                            )
                        })}
                    </IonSlide>
                </IonSlides>

                <IonSlides>
                    <IonSlide>
                        <IonCard className="categorycard">
                            <IonButton className="categoryicons" fill="clear"  >
                                <IonIcon className="my-icon" icon={videocamOutline} size="large" color="warning" />
                            </IonButton>
                            <IonCardSubtitle  >Video</IonCardSubtitle>
                        </IonCard>

                        <IonCard className="categorycard" >
                            <IonButton fill="clear">
                                <IonIcon className="my-icon" icon={musicalNotesOutline} size="large" color="warning" />
                            </IonButton>
                            <IonCardSubtitle  >Music</IonCardSubtitle>
                        </IonCard>

                        <IonCard className="categorycard" >
                            <IonButton fill="clear">
                                <IonIcon className="my-icon" icon={cameraOutline} size="large" color="warning" />
                            </IonButton>
                        </IonCard>
                    </IonSlide>

                    <IonSlide>
                        <IonCard className="categorycard" >
                            <IonButton fill="clear">
                                <IonIcon className="my-icon" icon={videocamOutline} size="large" color="warning" />
                            </IonButton>
                        </IonCard>

                        <IonCard className="categorycard">
                            <IonButton fill="clear">
                                <IonIcon className="my-icon" icon={musicalNotesOutline} size="large" color="warning" />
                            </IonButton>
                        </IonCard>

                        <IonCard className="categorycard" >
                            <IonButton fill="clear">
                                <IonIcon className="my-icon" icon={cameraOutline} size="large" color="warning" />
                            </IonButton>
                        </IonCard>
                    </IonSlide>
                </IonSlides>


                { recommended.length > 0 &&  (<h5 className="trendingtitle" >Recommended</h5>)}
                { recommended.length > 0 &&  (<IonButton className="showallbutton" color="warning" fill="clear" >View more</IonButton>)}


                <IonSlides className="ionslider" options={slideOpts} >
                    <IonSlide>
                        {recommended.map((object: any, i: any) => {
                            return (
                                <IonCard className="londoncard" key={i}>
                                    <IonImg className="london" src={object.data.profilePicture} />
                                    <Link to={{ pathname: "/viewprofile/" + "" + object.data.username, state: { username: object.data.username, fromWhere: "search", id: object.id } }} style={{ textDecoration: "none" }}>
                                        <h5 className="trendingheader ion-text-capitalize" style={{ margin: "auto", padding: "2px 0px" }}>{object.data.firstname + " " + object.data.lastname}</h5>
                                    </Link>
                                    <IonCardSubtitle className="trendingcategory ion-text-capitalize" style={{ margin: "auto", padding: "2px 0px" }}>{object.data.category}</IonCardSubtitle>
                                    <div className="explorestars" style={{ margin: "auto" }}>
                                        <IonIcon icon={star} size="small" color="warning" />
                                        <IonIcon icon={star} size="small" color="warning" />
                                        <IonIcon icon={star} size="small" color="warning" />
                                        <IonIcon icon={star} size="small" color="warning" />
                                        <IonIcon icon={star} size="small" color="warning" />
                                    </div>
                                </IonCard>
                            )
                        })}
                    </IonSlide>
                </IonSlides>


                <h5 className="trendingtitle" >Popular</h5>
                <IonButton className="showallbutton" color="warning" fill="clear" >View more</IonButton>

                <IonSlides className="ionslider"  >

                    <IonSlide>
                        <IonCard className="londoncard"  >
                            <IonImg className="london" src="/assets/london.png" />
                            <h5 className="trendingheader" >Lori Grey</h5>
                            <IonCardSubtitle className="trendingcategory" >Fashion Model</IonCardSubtitle>
                            <div className="explorestars" >
                                <IonIcon icon={star} size="small" color="warning" />
                                <IonIcon icon={star} size="small" color="warning" />
                                <IonIcon icon={star} size="small" color="warning" />
                                <IonIcon icon={star} size="small" color="warning" />
                                <IonIcon icon={star} size="small" color="warning" />
                            </div>
                        </IonCard>
                    </IonSlide>

                    <IonSlide>
                        <IonCard className="londoncard" >
                            <IonImg className="london" src="/assets/london.png" />
                            <h5 className="trendingheader" >Lori Grey</h5>
                            <IonCardSubtitle className="trendingcategory" >Fashion Model</IonCardSubtitle>
                            <div className="explorestars" >
                                <IonIcon icon={star} size="small" color="warning" />
                                <IonIcon icon={star} size="small" color="warning" />
                                <IonIcon icon={star} size="small" color="warning" />
                                <IonIcon icon={star} size="small" color="warning" />
                                <IonIcon icon={star} size="small" color="warning" />
                            </div>
                        </IonCard>
                    </IonSlide>

                    <IonSlide>
                        <IonCard className="londoncard" >
                            <IonImg className="london" src="/assets/london.png" />
                            <h5 className="trendingheader" >Lori Grey</h5>
                            <IonCardSubtitle className="trendingcategory" >Fashion Model</IonCardSubtitle>
                            <div className="explorestars" >
                                <IonIcon icon={star} size="small" color="warning" />
                                <IonIcon icon={star} size="small" color="warning" />
                                <IonIcon icon={star} size="small" color="warning" />
                                <IonIcon icon={star} size="small" color="warning" />
                                <IonIcon icon={star} size="small" color="warning" />
                            </div>
                        </IonCard>

                        <IonCard className="londoncard">
                            <IonImg className="london" src="/assets/london.png" />
                            <h5 className="trendingheader" >Lori Grey</h5>
                            <IonCardSubtitle className="trendingcategory" >Fashion Model</IonCardSubtitle>
                            <div className="explorestars" >
                                <IonIcon icon={star} size="small" color="warning" />
                                <IonIcon icon={star} size="small" color="warning" />
                                <IonIcon icon={star} size="small" color="warning" />
                                <IonIcon icon={star} size="small" color="warning" />
                                <IonIcon icon={star} size="small" color="warning" />
                            </div>
                        </IonCard>

                        <IonCard className="londoncard">
                            <IonImg className="london" src="/assets/london.png" />
                            <h5 className="trendingheader" >Lori Grey</h5>
                            <IonCardSubtitle className="trendingcategory" >Fashion Model</IonCardSubtitle>
                            <div className="explorestars" >
                                <IonIcon icon={star} size="small" color="warning" />
                                <IonIcon icon={star} size="small" color="warning" />
                                <IonIcon icon={star} size="small" color="warning" />
                                <IonIcon icon={star} size="small" color="warning" />
                                <IonIcon icon={star} size="small" color="warning" />
                            </div>
                        </IonCard>
                    </IonSlide>
                </IonSlides>

                { newest.length > 0 && (<h5 className="trendingtitle" >Newest</h5>)}
                { newest.length > 0 && (<IonButton className="showallbutton" color="warning" fill="clear" >View more</IonButton>)}

                <IonSlides className="ionslider" options={slideOpts}>
                    <IonSlide>
                        {newest.map((object: any, i: any) => {
                            return (
                                <IonCard className="londoncard" key={i}>
                                    <IonImg className="london" src={object.data.profilePicture} />
                                    <Link to={{ pathname: "/viewprofile/" + "" + object.data.username, state: { username: object.data.username, fromWhere: "search", id: object.id } }} style={{ textDecoration: "none" }}>
                                        <h5 className="trendingheader ion-text-capitalize" style={{ margin: "auto", padding: "2px 0px" }}>{object.data.firstname + " " + object.data.lastname}</h5>
                                    </Link>
                                    <IonCardSubtitle className="trendingcategory ion-text-capitalize" style={{ margin: "auto", padding: "2px 0px" }}>{object.data.category}</IonCardSubtitle>
                                    <div className="explorestars" style={{ margin: "auto" }}>
                                        <IonIcon icon={star} size="small" color="warning" />
                                        <IonIcon icon={star} size="small" color="warning" />
                                        <IonIcon icon={star} size="small" color="warning" />
                                        <IonIcon icon={star} size="small" color="warning" />
                                        <IonIcon icon={star} size="small" color="warning" />
                                    </div>
                                </IonCard>
                            )
                        })}
                    </IonSlide>
                </IonSlides>


            </IonContent>
        </IonPage>
    );
};

export default Explore;
