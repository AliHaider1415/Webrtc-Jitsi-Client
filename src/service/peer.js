class PeerService {
  constructor() {
    this.peer = null;
  }

  initializePeer() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      });
    }
    this.setupPeerListeners();
  }

  setupPeerListeners() {
    if (!this.peer) return;

    this.peer.addEventListener("track", (event) => {
      console.log("Received remote track");
    });

    this.peer.addEventListener("negotiationneeded", () => {
      console.log("Negotiation needed");
    });
  }

  async getAnswer(offer) {
    this.initializePeer();

    try {
      await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await this.peer.createAnswer();
      await this.peer.setLocalDescription(answer);
      return answer;
    } catch (error) {
      console.error("Error setting answer:", error);
      return null;
    }
  }

  async getOffer() {
    this.initializePeer();

    try {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(offer);
      return offer;
    } catch (error) {
      console.error("Error creating offer:", error);
      return null;
    }
  }

  async setLocalDescription(offer) {
    this.initializePeer();

    try {
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
    } catch (error) {
      console.error("Error setting local description:", error);
    }
  }

  async setRemoteDescription(answer) {
    this.initializePeer();

    try {
      await this.peer.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
      console.error("Error setting remote description:", error);
    }
  }
}

export default new PeerService();
