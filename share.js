// activityDetail

handleTodo(code) {
  // if (!this.lock) {
  //
  // }
  switch (code) {
    case 'wx_circle':
      this.onPressTimeline();
      this.refs.modal.close();
      break;
    case 'wx_friend':
      this.onPressSession();
      this.refs.modal.close();
      break;
    default:
      break;
  }
}

onPressSession() {
  let {activityId, cover, title, share, type} = this.state.actData;
  let webUrl = type === "focus" ?  `http://m.jnexpert.com/mobile/focus/focusDetail?f=${activityId}` : `http://m.jnexpert.com/mobile/activity/activityDetail?a=${activityId}`;

  WeChat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          WeChat.shareToSession({
            thumbImage: cover || "http://www.jnexpert.com/assets/public/img/index/logo.png",
            title: title || '',
            description: share || "",
            type: 'news',
            webpageUrl: webUrl
          })
              .catch((error) => {
              });
        } else {
          console.log('还没有安装微信');
        }
      })
};

onPressTimeline() {
  let {activityId, cover, title, share, type} = this.state.actData;
  let webUrl = type === "focus" ?  `http://m.jnexpert.com/mobile/focus/focusDetail?f=${activityId}` : `http://m.jnexpert.com/mobile/activity/activityDetail?a=${activityId}`;

  WeChat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          WeChat.shareToTimeline({
            thumbImage: cover || "http://www.jnexpert.com/assets/public/img/index/logo.png",
            title: title || '',
            type: 'news',
            webpageUrl: webUrl
          })
              .catch((error) => {
              });
        } else {
          console.log('还没有安装微信');
        }
      })
}

_renderList(data) {
    return data.map((item, i) => {
      return (
          <TouchableOpacity key={i} onPress={()=>this.handleTodo(item.code)} style={sStyles.item}>
            <Image style={sStyles.image} source={item.icon}/>
            <Text style={sStyles.title}>{item.name}</Text>
          </TouchableOpacity>
      )
    })
  }

  open() {
    this.refs.modal.open()
  }

  close() {
    this.refs.modal.close()
  }


  <ModalBox
                ref={"modal"}
                style={[sStyles.modal,
                  {width: Window.width, height: Math.ceil(shareList.length / 3) * 100 + 70}]}
                backdropOpacity={0.3}
                position={"bottom"}
                isOpen={false}>
              <View style={sStyles.content}>
                { this._renderList(shareList) }
              </View>
              <TouchableOpacity
                  onPress={()=>this.close()} style={sStyles.btn}>
                <Text style={sStyles.btnText}>取消</Text>
              </TouchableOpacity>
            </ModalBox>


            const sStyles = StyleSheet.create({
  content: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 20,
    paddingRight: 20,
    position: 'relative',
  },
  item: {
    width: (Window.width - 40) / 3,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    color: '#9B9B9B',
  },
  btn: {
    borderTopColor: '#eee',
    borderTopWidth: 1 / PixelRatio.get(),
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 16,
    color: '#686868',
  },
});
WeChat.registerApp('wx8df72ce1b7ed4fca');



// 专家分享
onPressSession() {
  const {avatar='www.jnexpert.com', name='', summary='', id} = this.state.expert[0];

  WeChat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          WeChat.shareToSession({
            thumbImage: avatar || "http://www.jnexpert.com/assets/public/img/index/logo.png",
            title: `锦囊专家- ${name}` || '锦囊专家',
            description: summary || "",
            type: 'news',
            webpageUrl: `http://m.jnexpert.com/mobile/expert/expertDetail?e=${id}`
          })
              .catch((error) => {
              });
        } else {
          console.log('还没有安装微信');
        }
      })
};

onPressTimeline() {
  const {avatar='www.jnexpert.com', name='', id} = this.state.expert[0];

  WeChat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          WeChat.shareToTimeline({
            thumbImage: avatar || "http://www.jnexpert.com/assets/public/img/index/logo.png",
            title: `锦囊专家- ${name}` || '锦囊专家',
            type: 'news',
            webpageUrl: `http://m.jnexpert.com/mobile/expert/expertDetail?e=${id}`
          })
              .catch((error) => {
              });
        } else {
          console.log('还没有安装微信');
        }
      })
}
